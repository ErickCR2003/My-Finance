import { CategoryCard } from "./CategoryCard";

export function CategoriesList({ categories, onEdit, onDelete }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}