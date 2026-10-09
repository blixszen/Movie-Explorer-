import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ---------- Mock data (hardcoded, no API) ----------
const movies = [
  {
    id: '1',
    title: 'Midnight Express Lane',
    emoji: '🚆',
    genre: 'Thriller',
    year: 2024,
    rating: 8.1,
    duration: '2h 05m',
    description:
      'A night-shift train conductor discovers a passenger who should not exist and has until sunrise to find out why.',
  },
  {
    id: '2',
    title: 'The Last Lighthouse',
    emoji: '🌊',
    genre: 'Drama',
    year: 2023,
    rating: 7.6,
    duration: '1h 52m',
    description:
      'An aging keeper and a stranded sailor wait out the storm of the century and trade secrets neither planned to share.',
  },
  {
    id: '3',
    title: 'Pixel Heist',
    emoji: '🎮',
    genre: 'Comedy',
    year: 2025,
    rating: 7.2,
    duration: '1h 38m',
    description:
      'Four arcade regulars plot to steal a legendary high-score machine from a rival gaming convention.',
  },
  {
    id: '4',
    title: 'Orbit 9',
    emoji: '🚀',
    genre: 'Sci-Fi',
    year: 2025,
    rating: 8.7,
    duration: '2h 24m',
    description:
      'When a deep-space relay goes silent, a rookie engineer is sent to repair it and finds the crew never left.',
  },
  {
    id: '5',
    title: 'Garden of Static',
    emoji: '📻',
    genre: 'Mystery',
    year: 2022,
    rating: 7.9,
    duration: '1h 59m',
    description:
      "A radio host starts receiving calls from listeners who describe tomorrow's news in perfect detail.",
  },
];

// ---------- Screen 1: Home ----------
function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.homeEmoji}>🎬</Text>
      <Text style={styles.title}>Movie Explorer</Text>
      <Text style={[styles.subtitle, { textAlign: 'center' }]}>
        Browse what's playing and open any title for the full details.
      </Text>

      <TouchableOpacity
        style={[styles.primaryButton, { marginTop: 32, alignSelf: 'stretch' }]}
        onPress={() => navigation.navigate('Catalog')}
      >
        <Text style={styles.primaryButtonText}>Browse movies</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Screen 2: Catalog ----------
function CatalogScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      // Pass the whole movie object to Details via route.params
      onPress={() => navigation.navigate('Details', { movie: item })}
    >
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMeta}>
          {item.genre} · {item.year}
        </Text>
      </View>
      <Text style={styles.rating}>★ {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Custom back button using navigation.goBack() */}
      <TouchableOpacity
        style={[styles.secondaryButton, { marginTop: 16 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryButtonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Screen 3: Details ----------
function DetailsScreen({ route, navigation }) {
  // Receive the movie object sent from the Catalog screen
  const { movie } = route.params;

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      <View style={styles.posterBox}>
        <Text style={{ fontSize: 88 }}>{movie.emoji}</Text>
      </View>

      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>
        {movie.genre} · {movie.year} · {movie.duration}
      </Text>
      <Text style={[styles.rating, { fontSize: 18, marginTop: 12 }]}>
        ★ {movie.rating} / 10
      </Text>
      <Text style={styles.description}>{movie.description}</Text>

      <View style={{ marginTop: 32 }}>
        {/* Custom back button using navigation.goBack() */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Back to catalog</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, { marginTop: 12 }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryButtonText}>Go to home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ---------- Navigation ----------
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Now Showing' }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({ title: route.params.movie.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const colors = {
  background: '#10151F',
  surface: '#1B2332',
  text: '#F3EFE6',
  muted: '#9AA4B5',
  accent: '#F2B134',
  accentText: '#10151F',
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  center: { justifyContent: 'center', alignItems: 'center' },
  homeEmoji: { fontSize: 72, marginBottom: 16 },
  title: { fontSize: 34, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: 16, color: colors.muted, marginTop: 8, lineHeight: 22 },
  description: { color: colors.text, fontSize: 16, lineHeight: 24, marginTop: 20 },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: { color: colors.accentText, fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: colors.muted,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: { color: colors.text, fontSize: 16, fontWeight: '600' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
  },
  cardEmoji: { fontSize: 36, marginRight: 14 },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  cardMeta: { color: colors.muted, fontSize: 14, marginTop: 4 },
  rating: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  posterBox: {
    height: 180,
    backgroundColor: colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
});
