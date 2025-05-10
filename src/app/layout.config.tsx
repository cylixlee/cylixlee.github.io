import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Image } from "fumadocs-core/framework";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image src={"/icon.png"} alt="" width={28} height={28} />
        CYLIX
      </>
    ),
    transparentMode: "always",
  },
};
