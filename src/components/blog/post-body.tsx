import type { Block } from "@/lib/blog-data";

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-12 mb-4 font-heading text-heading-lg text-foreground first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-accent py-1 pl-6 text-heading-sm text-foreground"
              >
                <p>{block.text}</p>
                {block.attribution && (
                  <cite className="mt-3 block font-mono text-label not-italic tracking-[0.06em] uppercase text-subtle-foreground">
                    {block.attribution}
                  </cite>
                )}
              </blockquote>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={i}
                className="my-6 flex flex-col gap-3 text-body text-muted-foreground"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    {block.ordered ? (
                      <span className="shrink-0 font-mono text-label text-subtle-foreground">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                    ) : (
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ListTag>
            );
          }
          case "p":
          default:
            return (
              <p key={i} className="mb-6 text-body text-muted-foreground">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
