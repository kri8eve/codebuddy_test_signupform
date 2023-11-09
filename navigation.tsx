import {SignUpProvider} from './providers/SignUpProvider'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreenOne from './screens/SignUpScreenOne';
import SignUpScreenTwo from './screens/SignUpScreenTwo';
import SignUpScreenThree from './screens/SignUpScreenThree';

const SignUpStack = createNativeStackNavigator();

function SignUpStackGroup() {
    return (
      <SignUpProvider>
        <SignUpStack.Navigator screenOptions={{headerShown: false}}>
          <SignUpStack.Screen name="screen-one" component={SignUpScreenOne} />
          <SignUpStack.Screen name="screen-two" component={SignUpScreenTwo} />
          <SignUpStack.Screen name="screen-three" component={SignUpScreenThree} />
        </SignUpStack.Navigator>
      </SignUpProvider>
    );
  }
  

  export default function Navigation() {
    return (
      <NavigationContainer>
        <SignUpStackGroup />
      </NavigationContainer>
    );
  }
  