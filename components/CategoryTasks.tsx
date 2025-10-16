import { SampleData } from '@/data/Tasks';
import { Text, View } from 'react-native';

type CategoryTasksProps = {
  selectedCategory: string;
};

export default function CategoryTasks({ selectedCategory }: CategoryTasksProps) {
  const tasks = SampleData[selectedCategory] || [];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{selectedCategory}</Text>
      {tasks.map(task => (
        <View key={task.id}>
          <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </Text>
        </View>
      ))}
    </View>
  );
}
