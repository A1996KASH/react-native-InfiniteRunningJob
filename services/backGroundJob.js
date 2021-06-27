import {Linking} from 'react-native';
import BackgroundService from 'react-native-background-actions';
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
export const backgroundJob = async () => {
  const options = {
    taskName: 'GyroPalm',
    taskTitle: 'Connecting',
    taskDesc: 'Connecting to Device',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: 'blue',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 3000,
    },
  };

  Linking.addEventListener('url', handleOpenURL);
  let playing = BackgroundService.isRunning();
  playing = !playing;
  if (playing) {
    try {
      console.log('Trying to start background service');
      await BackgroundService.start(veryIntensiveTask, options);
      await BackgroundService.updateNotification({
        taskDesc: 'New ExampleTask description',
      });
      console.log(BackgroundService.isRunning());
      console.log('Successful start!');
    } catch (e) {
      console.log('Error', e);
    }
  } else {
    console.log('Stop background service');
    await BackgroundService.stop();
  }
};

function handleOpenURL(evt) {
  console.log(evt.url);
  // do something with the url
}

async function veryIntensiveTask(taskDataArguments) {
  console.log('runninn');
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });
}
