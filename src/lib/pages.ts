import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PAGES_DIR = path.join(process.cwd(), "content", "pages");

export type ServicePage = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
};

export function getPageBySlug(slug: string): ServicePage | null {
  const filePath = path.join(PAGES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    title: data.title as string,
    metaTitle: data.metaTitle as string,
    metaDescription: data.metaDescription as string,
    content,
  };
}

export type PriceRow = {
  service: string;
  price: string;
};

export type PriceGroup = {
  title: string;
  rows: PriceRow[];
};

export type StoimostPage = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  groups: PriceGroup[];
  footnote: string;
};

export function getStoimostPage(): StoimostPage | null {
  const filePath = path.join(PAGES_DIR, "stoimost.md");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    title: data.title as string,
    metaTitle: data.metaTitle as string,
    metaDescription: data.metaDescription as string,
    groups: data.groups as PriceGroup[],
    footnote: data.footnote as string,
  };
}
