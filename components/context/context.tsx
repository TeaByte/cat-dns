"use client";
import React, { createContext, useContext, useState } from "react";

type SubdomainData = {
  id: string;
  subdomain: string;
  record: string;
  content: string;
  ownerId: string;
};

type SubDomainContextType = {
  subdomains: SubdomainData[];
  addSubdomain: (newSubdomain: SubdomainData) => void;
  updateSubdomain: (updatedSubdomain: SubdomainData) => void;
  deleteSubdomain: (id: string) => void;
  addSubdomains: (newSubdomains: SubdomainData[]) => void;
};

const SubDomainContext = createContext<SubDomainContextType | null>(null);

export function SubDomainProvider({ children }: { children: React.ReactNode }) {
  const [subdomains, setSubdomains] = useState<SubdomainData[]>([]);

  const addSubdomain = (newSubdomain: SubdomainData) => {
    setSubdomains([...subdomains, newSubdomain]);
  };

  const addSubdomains = (newSubdomains: SubdomainData[]) => {
    setSubdomains([...subdomains, ...newSubdomains]);
  };

  const updateSubdomain = (updatedSubdomain: SubdomainData) => {
    const updatedSubdomains = subdomains.map((subdomain) =>
      subdomain.id === updatedSubdomain.id ? updatedSubdomain : subdomain
    );
    setSubdomains(updatedSubdomains);
  };

  const deleteSubdomain = (id: string) => {
    const updatedSubdomains = subdomains.filter(
      (subdomain) => subdomain.id !== id
    );
    setSubdomains(updatedSubdomains);
  };

  return (
    <SubDomainContext.Provider
      value={{
        subdomains,
        addSubdomain,
        updateSubdomain,
        deleteSubdomain,
        addSubdomains,
      }}
    >
      {children}
    </SubDomainContext.Provider>
  );
}

export function useSubDomain() {
  const context = useContext(SubDomainContext);
  if (!context) {
    throw new Error("useSubDomain must be used within a SubDomainProvider");
  }
  return context;
}
