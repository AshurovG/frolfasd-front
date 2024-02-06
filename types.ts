import { AxiosResponse } from "axios"
export type Response = Promise<AxiosResponse> | any

// Backend types

export type ReceivedFacadeData = {
  exterior_design_id: number
  exterior_design_title: string
  exterior_design_url: string
  exterior_design_description: string
  is_important: boolean
  items: ReceivedFacadeItemData[]
}

export type ReceivedFacadeItemData = {
  exterior_design_items_id: number
  exterior_design_items_url: string
  exterior_design_id: number
}

export type ReceivedQuestionsData = {
  questions_id: number
  questions_title: string
  questions_text: string
}

// Frontend types

export type FacadeData = {
  id: number
  title: string
  url: string
  description: string
  isImportant: boolean
  items: FacadeItemData[]
}

export type FacadeItemData = {
  id: number
  url: string
  facadeId: number
}

export type QuestionsData = {
  id: number
  title: string
  text: string
}
