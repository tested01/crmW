import { StackNavigator } from 'react-navigation';
import Profile from './Profile';
import SelectRole from './SelectRole';
import RegisterStep1 from './RegisterStep1';

const MainScreen = StackNavigator({

  Step1: { screen: SelectRole },
  Step2: { screen: Profile },
  Step3: { screen: RegisterStep1 }
});

export default MainScreen;
