import React, {Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import ProductFlatListComponent from './ProductFlatListComponent';
import {getAllProduct} from '../../redux/actions/ProductActions';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: 0,
      refreshing: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllProduct("byEquipment"));
  }

  bindChangeTab(e) {
    const index = e.i;
    if (index === 0) {
      // Action.getAllProduct("byEquipment");
    } else {
      // Action.getAllProduct("byHashrate");
    }
  }

  handleRefresh(type) {
    // Action.getAllProduct(type);
  }

  render() {
    const {
      // productDataT,
      // productDataS,
      initialPage,
      refreshing,
    } = this.state;

    return (
      <View style={commonStyle.pageColor}>
        <ScrollableTabView
          initialPage={initialPage}
          onChangeTab={(e) => this.bindChangeTab(e)}
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
            <ProductFlatListComponent
              productData={[]}
              refreshingState={refreshing}
              onHandleRefresh={() => this.handleRefresh("byEquipment")}
            />
          </View>

          <View style={styles.FlatListContainer} tabLabel={'按算力购买'}>
            <ProductFlatListComponent
              productData={[]}
              refreshingState={refreshing}
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
  }
}

export default connect(select)(Product);