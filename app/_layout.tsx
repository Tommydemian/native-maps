import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: 'My maps'}} />
    </Stack>
  )
}

const styles = StyleSheet.create({})