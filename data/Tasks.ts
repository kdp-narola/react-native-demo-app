export const SampleData: Record<string, any[]> = {
  home: [
    { id: 1, title: "Clean the kitchen", completed: false, categorie: "home" },
    { id: 2, title: "Do laundry", completed: true, categorie: "home" },
  ],
  school: [
    { id: 3, title: "Math homework", completed: true, categorie: "school" },
    { id: 4, title: "Science project", completed: false, categorie: "school" },
  ],
  "shopping_list": [
    { id: 5, title: "Buy groceries", completed: false, categorie: "shopping_list" },
    { id: 6, title: "Get milk", completed: true, categorie: "shopping_list" },
    { id: 7, title: "Buy gift", completed: false, categorie: "shopping_list" },
  ],
};

export const Categories = [
    { name: 'none', color: 'bg-gray-400', count: 5 },
    { name: 'home', color: 'bg-red-400', count: 12 },
    { name: 'school', color: 'bg-yellow-400', count: 8 },
    { name: 'shopping_list', color: 'bg-blue-400', count: 3 }
];

export const Items = [
  { name: "Tasks", route: "/tasks", icon: require("../Img/task.png") },
  { name: "Categories", route: "/categories", icon: require("../Img/folder.svg") },
  { name: "Settings", route: "/settings", icon: require("../Img/settings.svg") }
];

export const getCategoryColor = (colorName: string) => {
  switch (colorName) {
    case "bg-gray-400":
      return "#9CA3AF";
    case "bg-red-400":
      return "#EF4444";
    case "bg-yellow-400":
      return "#F59E0B";
    case "bg-blue-400":
      return "#3B82F6";
    default:
      return "#3B82F6";
  }
};

export const getCategoryByColor = (categoryName: string) => {
  const cat = Categories.find((c) => c.name === categoryName);
  if (!cat) return "#3B82F6";
  switch (cat.color) {
    case "bg-gray-400":
      return "#9CA3AF";
    case "bg-red-400":
      return "#EF4444";
    case "bg-yellow-400":
      return "#F59E0B";
    case "bg-blue-400":
      return "#3B82F6";
    default:
      return "#3B82F6";
  }
};