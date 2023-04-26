declare module "*.css" {
  const json: Record<string, any>;
  export default json;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
