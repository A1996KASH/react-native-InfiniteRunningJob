import {Linking} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';
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
      delay: 10000,
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
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      BleManager.getConnectedPeripherals([]).then(data => {
        BleManager.retrieveServices(data[0].id).then(peripheralData => {
          BleManager.read(
            data[0].id,
            peripheralData.services[2].uuid,
            peripheralData.characteristics[4].characteristic,
          )
            .then(readData => {
              // Success code
              const buffer = Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
              console.log(buffer.toString());
            })
            .catch(error => {
              // Failure code
              console.log(error);
            });
        });
      });
      await sleep(delay);
    }
  });
}
