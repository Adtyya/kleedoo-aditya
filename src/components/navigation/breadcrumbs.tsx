import React from "react";

type Item = {
  path: string;
  href?: string;
};

type BreadcrumbProps = {
  items: Item[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="flex h-14 list-none items-stretch gap-2 rounded bg-white px-4 shadow-md shadow-slate-200">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isSecondLast = index === items.length - 2;

          return (
            <li
              key={index}
              className={`${
                isLast
                  ? "flex flex-1 items-center gap-2"
                  : isSecondLast
                    ? "flex items-center gap-2"
                    : "hidden items-center gap-2 md:flex"
              }`}
            >
              <a
                href={item.href ?? "#"}
                className={`${
                  isLast
                    ? "pointer-events-none max-w-[20ch] truncate whitespace-nowrap text-slate-400"
                    : "flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-slate-700 transition-colors hover:text-emerald-500"
                }`}
              >
                {item.path}
              </a>

              {!isLast && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 flex-none stroke-slate-700 transition-transform md:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
