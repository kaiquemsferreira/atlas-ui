import { AtlasOptionGroup, AtlasOptionRow } from './atlas-option-item';

export type VmKind = 'divider' | 'group' | 'option';

export interface Vm<T> {
  kind: VmKind;
  group?: AtlasOptionGroup;
  opt?: AtlasOptionRow<T>;
  optionIndex?: number;
}
