import React, {Component} from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {connect} from "react-redux";
import {setUserName} from '../../../redux/actions/MineActions';

class NickName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: "",
      editorButton: false
    };
  }

  componentDidMount(){

  }

  componentWillUnmount() {
    this.clickMoreTimer && clearTimeout(this.clickMoreTimer);
  }

  bindNickName(value) {
    this.setState({
      newName: value
    })
  }

  // 提交修改昵称
  submitNick() {
    const {userInfo} = this.props.mineReducer;
    const newName = this.state.newName.trim();
    const defaultName = userInfo.nickName;
    //控制多次点击
    this.setState({editorButton: true});
    this.clickMoreTimer = setTimeout(() => {
      this.setState({editorButton: false});
    }, 1500);

    if(!newName || newName === defaultName){
      ToastAndroid.showWithGravity('请填写新的昵称', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }else{
      Keyboard.dismiss();
      Actions.errorModal({icon_type: "loading", content: "昵称上传中"});
      this.props.dispatch(setUserName({nickName: newName}))
    }
  }

  render() {
    const {editorButton} = this.state;
    const {userInfo} = this.props.mineReducer;
    let nickName = userInfo.nickName;
    return (
      <View style={commonStyle.pageColor}>
        <View style={commonStyle.intervalView20}/>
        <TextInput
          style={styles.userNameInput}
          placeholder="点此输入新昵称"
          maxLength={16}
          underlineColorAndroid="transparent"
          defaultValue={nickName}
          onChangeText={(text) => this.bindNickName(text)}
        />
        <TouchableOpacity
          style={[commonStyle.center, commonStyle.paddingTb10, styles.editorBtn]}
          onPress={() => this.submitNick()}
          disabled={editorButton}
        >
          <Text style={styles.editorText}>确认修改</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userNameInput: {
    height: 55,
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    paddingLeft: 20
  },
  editorBtn: {
    marginTop: 50,
    marginHorizontal: 20,
    borderRadius: 2,
    backgroundColor: ColorStore.themeColor
  },
  editorText: {
    fontSize: 14,
    color: "#fff"
  }
});

function select(state) {
  return {
    mineReducer: state.MineReducer
  }
}

export default connect(select)(NickName);