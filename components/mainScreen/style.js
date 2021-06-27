import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  gyropalmContainer: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginTop: '50%',
    width: '100%',
    alignItems: 'center',
  },
  titles: {
    fontSize: 40,
    fontWeight: '500',
    color: '#fff',
  },
  subTitles: {
    fontSize: 16,
    color: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
  },
});
export default styles;
