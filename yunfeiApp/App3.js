import React, { Component } from 'react'
import {
  View,
  Picker,
  Text,
  Button,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  CameraRoll,
  ToastAndroid,
  TouchableOpacity,
  DeviceEventEmitter,
  PermissionsAndroid,
} from 'react-native'
// import CameraRoll from '@react-native-community/cameraroll' 
import CustomToast from "./src/CustomToast";
// 监听广播事件
import SendBroadcast from "./src/SendBroadcast";
// 读取当前手机短信
import GetSmsInPhone from "./src/GetMessageInfo";
/* 读取当前机型 */
import GetPhoneModel from "./src/GetPhoneModel";


var imgURL = "https://i.ibb.co/mNwrtG9/pig.jpg"
export default class PermissionAndroidView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      language: 'js',
      msg: '',
    }
  }
  /* ---保存图片--- */
  saveImg(img) {
    console.log("saveImg", img)
    var promise = CameraRoll.saveToCameraRoll(img);
    promise.then(function (result) {
      alert('保存成功！地址如下：\n' + result);
    }).catch(function (error) {
      alert('保存失败！\n' + error);
    });
  }
  /* ---打开短信--- */
  openWechat() {
    Linking.openURL("sms:" + 10086);
  }
  /* ---获取手机短信--- */
  getWechat() {
    GetSmsInPhone.getSmsInPhone(msg => {
      /* [{ num:123, mess:'你好' }] 数据结构*/
      alert(msg)
    })
  }
  /* ---读取图片--- */
  _handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 2,
      assetType: 'Photos',
    })
      .then(r => {
        alert('r:', r)
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        alert(err)
        //Error Loading Images
      });
  }
  /* ---读取机型--- */
  GetPhoneModel = () => {
    GetPhoneModel.getPhoneModel((msg) => {
      alert(msg)
    })
  }
  componentWillMount() {
    //监听事件名为EventName的事件
    DeviceEventEmitter.addListener('laiduanxinle', function (val) {
      alert(val);
    });
  }
  componentDidMount() {
    this.emitter = DeviceEventEmitter.addListener('eventName', this.evetntAlter)
  }
  clickEvent() {
    DeviceEventEmitter.emit('eventName', 123)
  }
  evetntAlter(val) {
    alert('我是弹出来的：' + val)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image style={styles.img}
            source={{ uri: imgURL }}
            resizeMode="contain" />
        </View>
        <View>
          <Text onPress={() => CustomToast.show('12313123', CustomToast.SHORT)}>弹出Toast</Text>
        </View>
        <View>
          <Text onPress={() => { SendBroadcast.sendBroadcast(); }}>广播Toast</Text>
        </View>
        <View>
          <Text onPress={this.openWechat.bind(this)}>打开短信</Text>
        </View>
        <View>
          <Text onPress={this.getWechat.bind(this)}>获取短信</Text>
          <Text>{this.state.msg}</Text>
        </View>
        <View>
          <Text onPress={this.clickEvent.bind(this)}>广播弹出alert(123)</Text>
        </View>
        <View>
          <Text onPress={this.saveImg.bind(this, imgURL)} style={[styles.saveImg]}>保存图片到相册</Text>
        </View>
        <View>
          <Text onPress={this.GetPhoneModel}>获取当前机型</Text>
        </View>

        <Picker
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Button title="Load Images" onPress={this._handleButtonPress} />
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.button_view}
          onPress={this.requestReadPermission.bind(this)}>
          <Text style={styles.button_text}>申请读写权限</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_view}
          onPress={this.requestCarmeraPermission.bind(this)}>
          <Text style={styles.button_text}>申请相机权限</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button_view}
          onPress={this.checkPermission.bind(this)}>
          <Text style={styles.button_text}>查询是否获取了读写权限</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_view}
          onPress={this.requestMultiplePermission.bind(this)}>
          <Text style={styles.button_text}>一次申请所以权限</Text>
        </TouchableOpacity>
      </View>
    )
  }
  /* ---卸载--- */
  componentWillUnmount() {
    //卸载广播（R-N）
    this.emitter.remove()
  }

  show(data) {
    ToastAndroid.show(data, ToastAndroid.SHORT)
  }

  async requestReadPermission() {
    try {
      //返回string类型
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {

          'title': 'need read permission',
          'message': 'the project need read permission '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.show("你已获取了读写权限")
      } else {
        this.show("获取读写权限失败")
      }
    } catch (err) {
      this.show(err.toString())
    }
  }

  async requestCarmeraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Camera Permission',
          'message': 'the project needs access to your camera ' +
            'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.show("你已获取了相机权限")
      } else {
        this.show("获取相机失败")
      }
    } catch (err) {
      this.show(err.toString())
    }
  }

  checkPermission() {
    try {
      //返回Promise类型
      const granted = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      granted.then((data) => {
        this.show("是否获取读写权限" + data)
      }).catch((err) => {
        this.show(err.toString())
      })
    } catch (err) {
      this.show(err.toString())
    }
  }

  async requestMultiplePermission() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA
      ]


      const granteds = await PermissionsAndroid.requestMultiple(permissions)

      var data = data + "是否同意相机权限: "
      if (granteds["android.permission.CAMERA"] === "granted") {
        data = data + "是\n"
      } else {
        data = data + "否\n"
      }
      data = data + "是否同意存储权限: "
      if (granteds["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted") {
        data = data + "是\n"
      } else {
        data = data + "否\n"
      }
      this.show(data)
    } catch (err) {
      this.show(err.toString())
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button_view: {
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#8d4dfc',
    alignItems: 'center',
  },
  button_text: {
    padding: 6,
    fontSize: 16,
    fontWeight: '600'
  },
  image: {
    borderWidth: 1,
    width: 300,
    height: 100,
    borderRadius: 5,
    borderColor: '#ccc'
  },
  img: {
    height: 98,
    width: 300,
  },
  saveImg: {
    height: 30,
    padding: 6,
    textAlign: 'center',
    backgroundColor: '#3BC1FF',
    color: '#FFF',
    marginTop: 10,
  }
})