import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {connect} from "react-redux";
import ListComponent from '../../../components/ListComponent';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadHeadImg} from '../../../redux/actions/MineActions';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  // 上传头像
  upLoadAvatar() {
    this.setState({modalVisible: true});
  }

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  // 打开相机
  bindOpenCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true
    }).then(image => {
      const uri = "data:" + image.mime + ";base64," + image.data;
      Actions.errorModal();
      this.props.dispatch(uploadHeadImg(uri));
      console.log(image);
    });
    this.setState({modalVisible: false});
  }

  // 相册中选一张
  bindSelectedPic() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true
    }).then(image => {
      const uri = "data:" + image.mime + ";base64," + image.data;
      Actions.errorModal();
      this.props.dispatch(uploadHeadImg(uri));
      console.log(image);
    });
    this.setState({modalVisible: false});
  }

  //手机
  bindUserPhoneNum() {

  }

  //邮箱
  bindUserEmail() {

  }

  render() {
    const {userInfo} = this.props.mineReducer;
    let avatar_url, nick_name, mobile, email;
    // 头像
    if (userInfo.avatar && userInfo.avatar.url) {
      avatar_url = {uri: userInfo.avatar.url}
    } else {
      avatar_url = ImageStore.commonPic.userPhoto;
    }
    // 名称
    nick_name = userInfo.nickName;
    // 手机号
    mobile = userInfo.mobile ? userInfo.mobile : "暂未绑定手机号";
    // 邮箱
    email = userInfo.email ? userInfo.email : "暂未绑定邮箱";
    return (
      <View style={commonStyle.pageColor}>
        <View style={commonStyle.intervalView20}/>
        <View style={styles.rowListContainer}>
          <View style={commonStyle.viewBorderBottom}>
            <TouchableOpacity
              style={[commonStyle.between, styles.padding15]}
              onPress={() => this.upLoadAvatar()}
              activeOpacity={0.8}
            >
              <Text style={styles.leftTextStyle}>头像</Text>
              <View style={styles.photoBox}>
                <Image source={avatar_url} style={styles.userPhoto}/>
              </View>
            </TouchableOpacity>
          </View>
          <ListComponent
            borderBottom={true}
            rightArrowIcon={true}
            leftText={"昵称"}
            rightText={nick_name}
            bindDetails={() => Actions.nickName()}
          />
          <ListComponent
            borderBottom={true}
            rightArrowIcon={true}
            leftText={"手机"}
            rightText={mobile}
            bindDetails={() => this.bindUserPhoneNum()}
          />
          <ListComponent
            borderBottom={false}
            rightArrowIcon={true}
            leftText={"邮箱"}
            rightText={email}
            bindDetails={() => this.bindUserEmail()}
          />
        </View>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this._setModalVisible(false)
          }}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => this.closeModal()}
            activeOpacity={0.8}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalBody}>
                <Text style={styles.upPhotoTitle}>上传头像</Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.bindOpenCamera()}
                >
                  <Text style={styles.chooseText}>拍一张</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => this.bindSelectedPic()}
                >
                  <Text style={styles.chooseText}>从相册中选择一张</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.closeModal()}
                >
                  <Text style={styles.cancelPiker}>取消</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowListContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  userPhoto: {
    height: 60,
    width: 60,
    borderRadius: 60
  },
  photoBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  padding15: {
    paddingTop: 15,
    paddingBottom: 15
  },
  leftTextStyle: {
    fontSize: 14,
    color: "#4d4d4d"
  },
  //modal样式
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    width: SCREEN_WIDTH - 60,
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  upPhotoTitle: {
    fontSize: 24,
    color: "#333"
  },
  chooseText: {
    fontSize: 18,
    color: "#4d4d4d",
    lineHeight: 50
  },
  cancelPiker: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 20
  }
});

function select(state) {
  return {
    mineReducer: state.MineReducer
  }
}

export default connect(select)(UserInfo);