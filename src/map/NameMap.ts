const SPLIT = "__@field_split__";

type InternalNamePath = (string | number)[];

type KV<T> = {
  key: InternalNamePath;
  value: T;
};
/**
 * Convert name path into string to fast the fetch speed of Map.
 */
export const normalize = (namePath: InternalNamePath): string => {
  return namePath.map((item) => `${typeof item}:${item}`).join(SPLIT);
};

class NameMap<T> {
  private kvs = new Map<string, T>();

  public set = (key: InternalNamePath, value: T) => {
    this.kvs.set(normalize(key), value);
  };

  public get = (key: InternalNamePath): T => {
    return this.kvs.get(normalize(key)) as T;
  };

  public delete = (key: InternalNamePath) => {
    this.kvs.delete(normalize(key));
  };

  public update = (key: InternalNamePath, updater: (origin: T) => T | null) => {
    const origin = this.get(key);
    const next = updater(origin);
    if (!next) {
      this.delete(key);
    } else {
      this.set(key, next);
    }
  };

  public map = <U>(callback: (kv: KV<T>) => U) => {
    return [...this.kvs.entries()].map(([key, value]) => {
      const cells = key.split(SPLIT);
      return callback({
        key: cells.map((cell) => {
          const [, type, unit] = cell.match(/^([^:]*):(.*)$/) as string[];
          return type === "number" ? Number(unit) : unit;
        }),
        value,
      });
    });
  };

  public toJSON = (): Record<string, T> => {
    const json = {} as Record<string, T>;
    this.map(({ key, value }) => {
      json[key.join(".")] = value;
      return null;
    });
    return json;
  };
}

export default NameMap;
