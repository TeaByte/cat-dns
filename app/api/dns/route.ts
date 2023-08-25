import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  regesterCloudflareDNS,
  deleteCloudflareDNS,
  editCloudflareDNS,
} from "@/lib/cloudflare";
import { prisma } from "@/lib/prisma";

const MAX_SUBDOMAINS = 4;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const data = await req.json();
  let { subdomain, content, record } = data;
  if (!subdomain || !content || !record) {
    return NextResponse.json({
      errors: [{ message: "Not all fields are filled.", code: 500 }],
      result: {},
    });
  }
  [subdomain, content, record] = [subdomain, content, record].map((item) =>
    item.toLowerCase()
  );

  const currentUserId = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    include: {
      subdomains: true,
    },
  });

  if (!currentUserId) {
    return NextResponse.json({
      errors: [{ message: "User not found.", code: 500 }],
      result: {},
    });
  }

  if (currentUserId.subdomains.length) {
    if (currentUserId.subdomains.length >= MAX_SUBDOMAINS) {
      return NextResponse.json({
        errors: [
          {
            message: `You can't create more than ${MAX_SUBDOMAINS} subdomains.`,
            code: 500,
          },
        ],
        result: {},
      });
    }
  }

  const doExist = await prisma.subDomain.findFirst({
    where: {
      subdomain: subdomain as string,
    },
  });
  if (doExist) {
    return NextResponse.json({
      errors: [{ message: "Subdomain already exists.", code: 500 }],
      result: {},
    });
  }

  const dnsRecordResponse = await regesterCloudflareDNS(
    record,
    subdomain,
    content
  );

  if (dnsRecordResponse === undefined) {
    return NextResponse.json({
      errors: [{ message: "Unexpected error.", code: 500 }],
      result: {},
    });
  } else if (Array.isArray(dnsRecordResponse)) {
    return NextResponse.json({ errors: dnsRecordResponse, result: {} });
  } else {
    if (!dnsRecordResponse.result) {
      return NextResponse.json({
        errors: dnsRecordResponse.errors,
        result: {},
      });
    }

    try {
      await prisma.subDomain.create({
        data: {
          content: content as string,
          record: record as string,
          id: dnsRecordResponse.result.id,
          subdomain: subdomain as string,
          ownerId: currentUserId.id,
        },
      });
    } catch {
      return NextResponse.json({
        errors: [
          { message: "Something went wrong while creating.", code: 500 },
        ],
        result: {},
      });
    }

    return NextResponse.json({ result: dnsRecordResponse.result, errors: [] });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const data = await req.json();
  let { id } = data;
  if (!id) {
    return NextResponse.json({
      errors: [{ message: "Not all fields are filled.", code: 500 }],
      result: {},
    });
  }
  id = id.toLowerCase();

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    include: {
      subdomains: true,
    },
  });

  if (!currentUser) {
    return NextResponse.json({
      errors: [{ message: "User not found.", code: 500 }],
      result: {},
    });
  }

  for (const subdomain of currentUser.subdomains) {
    if (subdomain.ownerId !== currentUser.id) {
      return NextResponse.json({
        errors: [{ message: "You are not the owner.", code: 500 }],
        result: {},
      });
    }
  }

  try {
    const prismaResponse = await prisma.subDomain.delete({
      where: {
        id,
      },
    });
    const cloudflareResponse = await deleteCloudflareDNS(prismaResponse.id);
    console.log(cloudflareResponse);
    return NextResponse.json({
      result: `${prismaResponse.id} deleted successfully.`,
      errors: [],
    });
  } catch {
    return NextResponse.json({
      errors: [{ message: "Something went wrong while deleting.", code: 500 }],
      result: {},
    });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  const data = await req.json();
  let { id, record, subdomain, content } = data;
  if (!id || !record || !subdomain || !content) {
    return NextResponse.json({
      errors: [{ message: "Not all fields are filled.", code: 500 }],
      result: {},
    });
  }
  [id, subdomain, content] = [id, subdomain, content].map((item) =>
    item.toLowerCase()
  );

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    include: {
      subdomains: true,
    },
  });

  if (!currentUser) {
    return NextResponse.json({
      errors: [{ message: "User not found.", code: 500 }],
      result: {},
    });
  }

  let currentSubdomain:
    | {
        id: string;
        subdomain: string;
        record: string;
        content: string;
        ownerId: string;
      }
    | undefined = undefined;
  for (const subdomain of currentUser.subdomains) {
    if (subdomain.id === id) {
      currentSubdomain = subdomain;
    }
    if (subdomain.ownerId !== currentUser.id) {
      return NextResponse.json({
        errors: [{ message: "You are not the owner.", code: 500 }],
        result: {},
      });
    }
  }

  if (!currentSubdomain) {
    return NextResponse.json({
      errors: [{ message: "Subdomain not found.", code: 500 }],
      result: {},
    });
  }

  try {
    const prismaResponse = await prisma.subDomain.update({
      where: {
        id,
      },
      data: {
        content: content as string,
        record: record as string,
      },
    });

    const cloudflareResponse = await editCloudflareDNS(
      currentSubdomain.id,
      record as string,
      currentSubdomain.subdomain,
      content as string
    );
    console.log(cloudflareResponse);
    return NextResponse.json({
      result: `${prismaResponse.id} edited successfully.`,
      errors: [],
    });
  } catch {
    return NextResponse.json({
      errors: [{ message: "Something went wrong while deleting.", code: 500 }],
      result: {},
    });
  }
}
