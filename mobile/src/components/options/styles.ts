import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flexDirection: 'column'
  },
  options:{
    width: '100%',
    height: 50,
    marginBottom: 112,
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  title:{
    fontSize: 20,
    marginBottom: 32,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary,
    
  }
});