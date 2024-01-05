import { get } from "../get";

export type Path = (string | number | symbol)[];

const internalSet = <Entity = any, Output = Entity, value = any>(
  entity: Entity,
  paths: Path,
  value: value,
  removeIfUndefined
): Output => {
  if (!paths.length) return value as unknown as Output;

  const [path, ...restPath] = paths;
  let clone;
  if (!entity && typeof path === "number") {
    clone = [];
  } else if (Array.isArray(entity)) {
    clone = [...entity];
  } else {
    clone = { ...entity };
  }
  if (restPath.length === 1 && !value && removeIfUndefined) {
    delete clone[path][restPath[0]];
  } else {
    clone[path] = internalSet(clone[path], restPath, value, removeIfUndefined);
  }
  return clone;
};

export const set = <Entity = any, Output = Entity, Value = any>(
  entity: Entity,
  paths: Path,
  value?: Value,
  removeIfUndefined?: boolean
): Output => {
  if (
    paths.length &&
    removeIfUndefined &&
    value === undefined &&
    !get(entity, paths.slice(0, -1) as (string | number)[])
  ) {
    return entity as unknown as Output;
  }
  return internalSet(entity, paths, value, removeIfUndefined);
};
