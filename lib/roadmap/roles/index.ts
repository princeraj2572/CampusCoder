import { backend } from "./backend";
import { frontend } from "./frontend";
import { fullStack } from "./full-stack";
import { mobile } from "./mobile";
import { aiMl } from "./ai-ml";
import { data } from "./data";
import { devops } from "./devops";
import { security } from "./security";
import { qa } from "./qa";
import { embedded } from "./embedded";
import { game } from "./game";
import { uiUx } from "./ui-ux";
import { product } from "./product";
import { web3 } from "./web3";
import type { Role } from "./types";

export type { Role, RoleStage, RoleProject } from "./types";

export const ROLES: Role[] = [
  backend,
  frontend,
  fullStack,
  mobile,
  aiMl,
  data,
  devops,
  security,
  qa,
  embedded,
  game,
  uiUx,
  product,
  web3,
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
