export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface GetPetResponseDto {
  id: number;
  name: string;
  category: Category;
  photoUrls: string[];
  tags: Tag[];
  status: string;
}
