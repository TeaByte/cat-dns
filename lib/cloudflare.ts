import axios, { AxiosResponse } from "axios";
import { CloudflareAPIResponse, CloudflareError, Records } from "@/lib/types";

export const regesterCloudflareDNS = async (
  record: Records,
  subdomain: string,
  ip: string
): Promise<CloudflareError[] | CloudflareAPIResponse | undefined> => {
  try {
    const response: AxiosResponse = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records`,
      {
        type: record,
        name: subdomain,
        content: ip,
        ttl: 1,
        proxied: true,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data: CloudflareAPIResponse = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage: CloudflareAPIResponse = error.response?.data;
      return errorMessage.errors;
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

export const editCloudflareDNS = async (
  recordId: string,
  record: string,
  subdomain: string,
  ip: string
): Promise<CloudflareAPIResponse | CloudflareError[] | undefined> => {
  try {
    const response: AxiosResponse = await axios.put(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`,
      {
        type: record,
        name: subdomain,
        content: ip,
        ttl: 1,
        proxied: true,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data: CloudflareAPIResponse = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage: CloudflareAPIResponse = error.response?.data;
      return errorMessage.errors;
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

export const deleteCloudflareDNS = async (
  recordId: string
): Promise<CloudflareAPIResponse | CloudflareError[] | undefined> => {
  try {
    const response: AxiosResponse = await axios.delete(
      `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        },
      }
    );
    const data: CloudflareAPIResponse = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage: CloudflareAPIResponse = error.response?.data;
      return errorMessage.errors;
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};
