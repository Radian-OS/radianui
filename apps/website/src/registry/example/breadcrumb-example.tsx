"use client";

import { House, HouseIcon, Puzzle } from "lucide-react";
import { Breadcrumb, BreadcrumbItem } from "@/registry/ui/breadcrumb";

const BreadcrumbExample = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border p-6">
      <Breadcrumb maxItems={6}>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs1</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs2</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs3</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs4</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs5</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs6</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs7</BreadcrumbItem>
        <BreadcrumbItem href="/test">Breadcrumbs8</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Components</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem href="/">
          <House />
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">Components</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb separatorType="slash">
        <BreadcrumbItem href="/">
          <House />
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">Components</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/components">Components</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb separatorType="slash">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/components">Components</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb separatorType="slash">
        <BreadcrumbItem href="/">
          <HouseIcon />
          Home
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">
          <Puzzle />
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">
          <Puzzle />
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">
          <Puzzle />
        </BreadcrumbItem>
        <BreadcrumbItem href="/components">
          <Puzzle />
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbExample;
