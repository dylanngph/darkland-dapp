import ImageClass from 'assets/heroClassIcon'
import ImageOrigins from 'assets/heroOriginIcon'
import TargetType from 'assets/targetType'

import GenC from 'assets/images/C.png'
import GenR from 'assets/images/R.png'
import GenSR from 'assets/images/SR.png'
import GenSSR from 'assets/images/SSR.png'

export const HERO_GEN_CHECKBOX = {
  name: 'heroGen',
  type: 'radio',
  data: [
    { name: '0', label: 'Common', type: 'radio', color: '#9E9E9E', icon: '' },
    { name: '1', label: 'Rare', type: 'radio', color: '#00A3FF', icon: '' },
    { name: '2', label: 'Epic', type: 'radio', color: '#EB00FF', icon: '' },
    { name: '3', label: 'Legendary', type: 'radio', color: '#FF8000', icon: '' },
  ],
}
export const CLASS_CHECKBOX = {
  name: 'heroClasses',
  type: 'checkbox',
  data: [
    { name: '0', label: 'Assault', icon: ImageClass.AssassinIcon },
    { name: '1', label: 'Heavy', icon: ImageClass.DuelistIcon },
    { name: '2', label: 'Archer', icon: ImageClass.ElderwoodIcon },
    { name: '3', label: 'Sniper', icon: ImageClass.EnlightenedIcon },
    { name: '4', label: 'Grenade', icon: ImageClass.FortuneIcon },
  ],
}
export const ORIGIN_CHECKBOX = {
  name: 'heroOrigins',
  type: 'checkbox',
  data: [
    { name: '1', label: 'Brawler', icon: ImageOrigins.BrawlerIcon },
    { name: '7', label: 'Dazzler', icon: ImageOrigins.DazzlerIcon },
    { name: '5', label: 'Divine', icon: ImageOrigins.DivineIcon },
    { name: '4', label: 'Dragonsoul', icon: ImageOrigins.DragonsoulIcon },
    { name: '10', label: 'Fabled', icon: ImageOrigins.FabledIcon },
    { name: '9', label: 'Guardian', icon: ImageOrigins.GuardianIcon },
    { name: '8', label: 'Mystic', icon: ImageOrigins.MysticIcon },
    { name: '3', label: 'Ninja', icon: ImageOrigins.NinjaIcon },
    { name: '6', label: 'Reviver', icon: ImageOrigins.ReviverIcon },
    { name: '2', label: 'Vanguard', icon: ImageOrigins.VanguardIcon },
  ],
}
export const TARGET_CHECKBOX = {
  name: 'targetFilters',
  type: 'checkbox',
  data: [
    { name: '1', label: 'Front Enemy', icon: TargetType.Front },
    { name: '2', label: 'Strong Enemy', icon: TargetType.Strong },
    { name: '3', label: 'Weak Enemy', icon: TargetType.Weak },
    { name: '4', label: 'Random Enemy', icon: TargetType.Random },
  ],
}
export const STATUS_CHECKBOX = {
  label: 'Status',
  name: 'status',
  type: 'checkbox',
  data: [
    { name: '0', label: 'Summoning', icon: '' },
    { name: '1', label: 'Mature', icon: '' },
  ],
}

export const GENERAL_FILTER = [
  {
    label: 'Summon Time',
    type: 'slider',
    name: 'maxFusisionTime',
    defaultValue: 7,
    min: 0,
    max: 7,
    step: 1,
  },
]

export const GENERAL_CHECKBOX = [
  { label: 'Hero Rarity', value: HERO_GEN_CHECKBOX, color: '' },
  { label: 'Class', value: CLASS_CHECKBOX, color: '#00A3FF' },
  // { label: 'Origins', value: ORIGIN_CHECKBOX, color: '#EB00FF' },
  // { label: 'Target Type', value: TARGET_CHECKBOX, color: '' },
  // { label: 'Status', value: STATUS_CHECKBOX, color: '' },
]
