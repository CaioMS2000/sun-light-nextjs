import { atom, useAtom } from 'jotai'

import { Project } from './models';
import { CustomSet } from '@/utils/CustomSet';

// export const projectsAtom = atom<Project[]>([])
export const projectsAtom = atom<CustomSet>((new CustomSet()))
export const pageAtom = atom(1)