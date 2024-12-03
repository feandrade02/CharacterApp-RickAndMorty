export interface Info {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

export interface Location {
    name: string; // Nome do local
    url: string; // URL do local
  }

export interface Character {
    id: number;
    name: string;
    status: string; // Ex.: "Alive", "Dead", ou "unknown"
    species: string;
    type: string; // Pode ser uma string vazia
    gender: string; // Ex.: "Male", "Female", "Genderless", "unknown"
    origin: Location; // Informação sobre a origem do personagem
    location: Location; // Localização atual do personagem
    image: string; // URL da imagem do personagem
    episode: string[]; // Lista de URLs dos episódios em que o personagem aparece
    url: string; // URL do recurso do personagem na API
    created: string; // Data de criação do registro no formato ISO
}

export interface CharacterResponse {
    info: Info;
    results: Character[];
}