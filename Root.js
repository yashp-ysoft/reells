import React from 'react';
// import {TouchableWithoutFeedback } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens, ScreenContainer} from 'react-native-screens';
// import Splash from './Splash';
// import Login from './Login';
// import Dashboard from './Dashboard';
// import Home from './Home';
import Home from './Home';
import Bottom from './Bottom';
import Home1 from "./Home1";
// import Forgotpassword from './Forgotpassword';
// import Profile from './Profile';

const Stack = createNativeStackNavigator();
enableScreens();

const Root = () => {
 
  return (
    
  
      
    <NavigationContainer>
      
      <Stack.Navigator>
       
          {/* <Stack.Screen name="Splash" component={Splash} screenOptions={{statusBarHidden:true}}></Stack.Screen> */}
        <Stack.Screen name="Home" component={Bottom}></Stack.Screen>
        <Stack.Screen name="Home1" component={Home1}></Stack.Screen>
      
        {/* <Stack.Screen name="Profile" component={Profile}></Stack.Screen> */}
        
        {/* <Stack.Screen name="Changepassword" component={Changepassword}></Stack.Screen> */}
        {/* <Stack.Screen name="Forgotpassword" component={Forgotpassword}></Stack.Screen> */}


       
      </Stack.Navigator>
    </NavigationContainer>
    
    
    
  );
};

export default Root;


