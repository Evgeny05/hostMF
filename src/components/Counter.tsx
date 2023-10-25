import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "../redux/counterSlice"
import {
    Text,
    View,
    Button
  } from 'react-native';
import React from "react";

export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
  
    return (
        <View>
            <Button title="Increment" onPress={() => dispatch(increment())} />
            <Button title="Decrement" onPress={() => dispatch(decrement())} />
            <Text>{count}</Text>
        </View>
    )
  }