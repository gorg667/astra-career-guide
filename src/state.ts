import { useEffect, useState } from 'react';
export interface PersonalState {
  read: string[];
  saved: string[];
  selected: string[];
  tasks: string[];
  notes: Record<string, string>;
  lastChapter: string;
  largeText: boolean;
}
const initial: PersonalState = {
  read: [],
  saved: [],
  selected: [],
  tasks: [],
  notes: {},
  lastChapter: '',
  largeText: false,
};
const KEY = 'fieldguide-v1';
function load(): PersonalState {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (!data || typeof data !== 'object') return initial;
    const list = (key: string) =>
      Array.isArray(data[key])
        ? data[key].filter((v: unknown) => typeof v === 'string')
        : [];
    return {
      read: list('read'),
      saved: list('saved'),
      selected: list('selected').slice(0, 3),
      tasks: list('tasks'),
      notes:
        data.notes &&
        typeof data.notes === 'object' &&
        !Array.isArray(data.notes)
          ? (Object.fromEntries(
              Object.entries(data.notes).filter(
                ([, v]) => typeof v === 'string',
              ),
            ) as Record<string, string>)
          : {},
      lastChapter: typeof data.lastChapter === 'string' ? data.lastChapter : '',
      largeText: data.largeText === true,
    };
  } catch {
    return initial;
  }
}
export function usePersonalState() {
  const [state, setState] = useState<PersonalState>(load);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);
  return { state, setState, storageError };
}
export function toggleList(values: string[], id: string) {
  return values.includes(id) ? values.filter((v) => v !== id) : [...values, id];
}
export function downloadFile(
  name: string,
  content: string,
  type = 'text/markdown;charset=utf-8',
) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
export type StateProps = {
  state: PersonalState;
  setState: React.Dispatch<React.SetStateAction<PersonalState>>;
};
