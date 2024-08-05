import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, Text, ActivityIndicator, StyleSheet, Button, TextInput } from 'react-native'
import axios from 'axios'
import RNPickerSelect from 'react-native-picker-select'
import { API_KEY } from '../utils/config'

const RoverScreen = ({ rover }) => {
    const [photos, setPhotos] = useState([])
    const [filteredPhotos, setFilteredPhotos] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [selectedCamera, setSelectedCamera] = useState('all')
    const [earthDate, setEarthDate] = useState('')
    const [solDate, setSolDate] = useState('')
    const [searchTriggered, setSearchTriggered] = useState(false)

    // console.log(photos)
    // console.log(earthDate)

    const cameras = [
        { label: 'All', value: 'all' },
        { label: 'FHAZ', value: 'FHAZ' },
        { label: 'RHAZ', value: 'RHAZ' },
        { label: 'MAST', value: 'MAST' },
        { label: 'CHEMCAM', value: 'CHEMCAM' },
        { label: 'MAHLI', value: 'MAHLI' },
        { label: 'MARDI', value:'MARDI' },
        { label: 'NAVCAM', value: 'NAVCAM' },
        { label: 'PANCAM', value: 'PANCAM' },
        { label: 'MINITES', value: 'MINITES' },
    ]

    const fetchPhotos = async () => {
        if (loading) return
        setLoading(true)

        try {
        const params = {
            sol: solDate || undefined,
            earth_date: earthDate || undefined,
            page,
            api_key: API_KEY,
            camera: selectedCamera !== 'all' ? selectedCamera : undefined,
        }

        const response = await axios.get(
            `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
            { params }
        )

        const newPhotos = response.data.photos

        if (newPhotos.length === 0) {
            setHasMore(false)
        } else {
            setPhotos((prevPhotos) => {
            const existingIds = new Set(prevPhotos.map(photo => photo.id))
            const uniquePhotos = newPhotos.filter(photo => !existingIds.has(photo.id))
            return [...prevPhotos, ...uniquePhotos]
            })
        }
        } catch (error) {
        console.error(`Error fetching ${rover} photos:`, error)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        if (searchTriggered) {
        setPage(1)
        setPhotos([])
        fetchPhotos()
        }
        setSearchTriggered(false)
    }, [searchTriggered, selectedCamera, earthDate, solDate])

    useEffect(() => {
        filterPhotosByCamera(selectedCamera)
    }, [photos])

    const filterPhotosByCamera = (camera) => {
        if (camera === 'all') {
        setFilteredPhotos(photos)
        } else {
        setFilteredPhotos(photos.filter((photo) => photo.camera.name === camera))
        }
    }

    const handleLoadMore = () => {
        if (hasMore) {
        setPage((prev) => prev + 1)
        fetchPhotos()
        }
    }

    const handleSearch = () => {
        setSearchTriggered(true)
    }

    if (loading && !filteredPhotos.length) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )
    }

    return (
        <View style={styles.container}>
        <View style={styles.filters}>
            <RNPickerSelect
            onValueChange={(value) => setSelectedCamera(value)}
            items={cameras}
            style={pickerSelectStyles}
            value={selectedCamera}
            placeholder={{ label: 'Select a Camera', value: 'all' }}
            />
            <TextInput
            style={styles.input}
            placeholder="Earth Date (YYYY-MM-DD)"
            value={earthDate}
            onChangeText={setEarthDate}
            />
            <TextInput
            style={styles.input}
            placeholder="Sol Date"
            value={solDate}
            keyboardType="numeric"
            onChangeText={setSolDate}
            />
            <Button title="Search" onPress={handleSearch} />
        </View>

        {filteredPhotos.length > 0 ? (
            <FlatList
            data={filteredPhotos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.photoContainer}>
                <Image source={{ uri: item.img_src }} style={styles.image} />
                <Text style={styles.text}>Id: {item.id}</Text>
                <Text style={styles.text}>Earth Date: {item.earth_date}</Text>
                <Text style={styles.text}>Camera: {item.camera.full_name}</Text>
                <Text style={styles.text}>{item.camera.name}</Text>
                </View>
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            />
        ) : (
            <Text style={styles.noPhotosText}>No photos available</Text>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    photoContainer: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        marginBottom: 20,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    noPhotosText: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
        color: 'gray',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filters: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
})

export default RoverScreen