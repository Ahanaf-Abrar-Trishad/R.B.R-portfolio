// Sakuga VFX custom elements (loaded from /public/sakuga-vfx/*.js), so TSX accepts their tags.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type El<A = object> = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & A;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "sakuga-button": El<{ variant?: "secondary"; type?: string; disabled?: boolean }>;
      "sakuga-tabs": El<{ label?: string; selected?: number }>;
    }
  }
}
