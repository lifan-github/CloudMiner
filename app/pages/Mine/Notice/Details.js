import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

export default class Details extends Component {
  render() {
    const {details} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{details.title}</Text>
        <Text style={styles.content}>{details.content}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    marginTop: 30,
    marginBottom: 30
  },
  content: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24
  }
});