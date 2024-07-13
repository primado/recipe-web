interface User {
    id: number;
    password: string;
    last_login: string;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    bio: string;
    headline: string;
    instagram: string;
    facebook: string;
    website: string;
    profile_picture: string;
    groups: number[];
    user_permissions: number[];
}

interface Recipe {
    id: number;
    user: User;
    title: string;
    description: string;
    ingredient: string;
    instruction: string;
    cooking_time_duration: string;
    visibility: string;
    difficulty_level: string;
    recipe_image: string;
    created_at: string;
    last_updated: string;
}

export interface CollectionRecipe {
    recipe: Recipe;
    collection: number;
    is_bookmarked: boolean;
}

export interface CollectionDTO {
    id: number;
    name: string;
    description: string;
    user: User;
    visibility: string;
    collection_recipes: CollectionRecipe[];
    created_at: string;
    last_updated: string;
}
