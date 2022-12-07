import { MDDCNamespace, MDDCPage } from "@apps/contracts";
import { map, forEach } from "modern-async";

type PageById = Record<string, MDDCPage>;

type LinkTree =
  | (
      | string
      | {
          [page: string]: LinkTree;
        }
    )[]
  | {
      [page: string]: LinkTree;
    };

export type PageLinkTree = {
  [namespace: string]: LinkTree;
};

/**
 * Returned pages like key value object
 *
 * @param pages
 * @returns
 */
export function pagesById(pages: MDDCPage[]) {
  return pages.reduce((acc, page) => {
    acc[page.id] = page;
    return acc;
  }, {} as PageById);
}

/**
 * Contruct the every page chrildren tree
 *
 * @param parent The inital page where to start constructing children tree
 * @param pages
 * @returns
 */
export async function constructPagesTree(parent: MDDCPage, pages: PageById) {
  await forEach(parent.pages, async (page, i) => {
    const $page = pages[page.id];
    delete pages[page.id];
    if ($page) {
      parent.pages[i] = $page;
      await constructPagesTree($page, pages);
    } else {
      parent.pages.splice(i, 1);
    }
  });
  return parent;
}
