import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import FlatListComponent from './FlatListComponent';
import {getProduct} from '../../redux/actions/ProductActions';

class Product extends Component {
  componentDidMount() {
    this.props.dispatch(getProduct("byEquipment"));
    this.props.dispatch(getProduct("byHashrate"));
  }

  handleRefresh(type) {
    this.props.dispatch(getProduct(type));
  }

  render() {
    const {productDataT, productDataS} = this.props.productReducer;
    const {netWorker} = this.props.homeReducer;
    let block_diff, blockSubsidy; // 难度，出块量
    console.log(this.props.homeReducer,'this.props.homeReducer');
    console.log(this.props.productReducer,'商品-----》》》');
    if(netWorker.difficulty && netWorker.difficulty.current){
      block_diff = netWorker.difficulty.current;
    }else{
      block_diff = null;
    }
    blockSubsidy = netWorker.blockSubsidy ? netWorker.blockSubsidy : null;

    return (
      <View style={commonStyle.pageColor}>
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() =>
            <DefaultTabBar
              tabStyle={{paddingBottom: 0}}
              textStyle={{fontSize: 14}}
              underlineStyle={styles.underlineStyle}
              activeTextColor={'#333'}
              inactiveTextColor={'#9b9b9b'}
              style={styles.tabBarStyle}
            />
          }
        >
          <View style={styles.FlatListContainer} tabLabel={'按台购买'}>
            <FlatListComponent
              productData={productDataT}
              currentDiff={block_diff}
              currBlockSubsidy={blockSubsidy}
              refreshingState={false}
              onHandleRefresh={() => this.handleRefresh("byEquipment")}
            />
          </View>

          <View style={styles.FlatListContainer} tabLabel={'按算力购买'}>
            <FlatListComponent
              productData={productDataS}
              currentDiff={block_diff}
              currBlockSubsidy={blockSubsidy}
              refreshingState={false}
              onHandleRefresh={() => this.handleRefresh("byHashrate")}
            />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  underlineStyle: {
    borderColor: ColorStore.themeColor,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: ColorStore.themeColor,
    height: 2,
    left: (SCREEN_WIDTH - 78 * 2) / 4,
    width: 78
  },
  tabBarStyle: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    elevation: 4,
    backgroundColor: '#fff'
  },
  FlatListContainer: {
    flex: 1
  }
});

function select(state) {
  return {
    productReducer: state.ProductReducer,
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Product);