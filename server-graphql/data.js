let VIDEOS = [
    {
        id: '1',
        title: 'GraphQL from Scratch',
        duration: 180,
        watched: false
    },
    {
        id: '2',
        title: 'I love GraphQL',
        duration: 90,
        watched: false
    },
    {
        id: '3',
        title: 'GraphQL for Intermedite',
        duration: 100,
        watched: false
    }
]

const getVideoById = (id) => {
    return new Promise((resolve) => {
        const [video] = VIDEOS.filter(video => video.id === id);
        resolve(video)
    })
}

const getAllVideos = () => {
    return new Promise((resolve) => {
        resolve(VIDEOS)
    })
}

const createVideo = ({title, duration, watched}) => {
    const newVideo = {
        id: new Buffer.from(title, 'utf-8').toString('base64'),
        title,
        duration,
        watched
    };
    VIDEOS.push(newVideo);
    return newVideo;
}

const deleteVideo = (id) => {
    const deletedVideo = VIDEOS.find(video => video.id === id);
    const newVideo = VIDEOS.filter(video => video.id !== id);
    VIDEOS = newVideo;
    return deletedVideo;
}

module.exports = {
    getVideoById,
    getAllVideos,
    createVideo,
    deleteVideo
}