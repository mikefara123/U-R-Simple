import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    AppRegistry,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6A5ACD', '#483D8B']}
        style={styles.gradient}
      >
        <Text style={styles.title}>U/R Simple</Text>
        <Text style={styles.subtitle}>The Ultimate Usable Rentable Square Footage Calculator</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Single Story Building"
            onPress={() => navigation.navigate('Calculator')}
            color="#483D8B"
          />
        </View>
      </LinearGradient>
      <StatusBar style="light" />
    </View>
  );
}

function CalculatorScreen() {
  const [buildingGross, setBuildingGross] = useState('5620');
  const [verticalShafts, setVerticalShafts] = useState('250');
  const [commonAreas, setCommonAreas] = useState('1520');
  const [totalRentable, setTotalRentable] = useState('');
  const [totalUsable, setTotalUsable] = useState('');
  
  useEffect(() => {
    // Calculate rentable square footage
    const gross = parseFloat(buildingGross) || 0;
    const shafts = parseFloat(verticalShafts) || 0;
    const common = parseFloat(commonAreas) || 0;
    
    const rentable = gross - shafts;
    const usable = rentable - common;
    
    setTotalRentable(rentable.toFixed(2));
    setTotalUsable(usable.toFixed(2));
  }, [buildingGross, verticalShafts, commonAreas]);
  
  return (
    <SafeAreaView style={styles.calculatorContainer}>
      <ScrollView>
        <Text style={styles.calculatorTitle}>Single Story Building Calculator</Text>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            DISCLAIMER: It is highly recommended to hire a professional measurer to verify exact square footage.
          </Text>
        </View>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Building Information</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>BUILDING GROSS:</Text>
            <TextInput
              style={styles.input}
              value={buildingGross}
              onChangeText={setBuildingGross}
              keyboardType="numeric"
            />
            <Text style={styles.inputUnit}>sq. ft.</Text>
          </View>
        </View>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Vertical Shafts</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>TOTAL VERTICAL SHAFTS:</Text>
            <TextInput
              style={styles.input}
              value={verticalShafts}
              onChangeText={setVerticalShafts}
              keyboardType="numeric"
            />
            <Text style={styles.inputUnit}>sq. ft.</Text>
          </View>
        </View>
        
        <View style={styles.calculationBox}>
          <Text style={styles.calculationText}>{buildingGross} sq. ft. - {verticalShafts} sq. ft. = {totalRentable} TOTAL RENTABLE SQ. FT.</Text>
        </View>
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Common Areas</Text>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>TOTAL COMMON AREAS:</Text>
            <TextInput
              style={styles.input}
              value={commonAreas}
              onChangeText={setCommonAreas}
              keyboardType="numeric"
            />
            <Text style={styles.inputUnit}>sq. ft.</Text>
          </View>
        </View>
        
        <View style={styles.calculationBox}>
          <Text style={styles.calculationText}>{totalRentable} sq. ft. - {commonAreas} sq. ft. = {totalUsable} TOTAL USABLE SQ. FT.</Text>
        </View>
        
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Building Gross:</Text>
            <Text style={styles.summaryValue}>{buildingGross} sq. ft.</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vertical Shafts:</Text>
            <Text style={styles.summaryValue}>{verticalShafts} sq. ft.</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Common Areas:</Text>
            <Text style={styles.summaryValue}>{commonAreas} sq. ft.</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Rentable:</Text>
            <Text style={styles.summaryValue}>{totalRentable} sq. ft.</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Usable:</Text>
            <Text style={styles.summaryValue}>{totalUsable} sq. ft.</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Calculation</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Calculator" 
          component={CalculatorScreen}
          options={{ title: 'Single Story Calculator' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Register the app
AppRegistry.registerComponent('main', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 3,
    marginVertical: 10,
  },
  calculatorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  calculatorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6A5ACD',
  },
  disclaimer: {
    backgroundColor: '#FFBF00',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#333',
  },
  inputSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6A5ACD',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    flex: 1,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    width: 120,
    textAlign: 'right',
  },
  inputUnit: {
    width: 50,
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  calculationBox: {
    backgroundColor: '#E6E6FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  calculationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#483D8B',
  },
  summary: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6A5ACD',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#333',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 