import { Server, Socket } from 'socket.io'
import InterviewRoom from '../models/InterviewRoom.js'

const rooms = new Map<string, Set<string>>()

export const registerRoomHandlers = (io: Server, socket: Socket) => {
    const userId = (socket as any).userId
    const userName = (socket as any).userName || 'Anonymous'

    socket.on('join-room', async (roomId: string) => {
        try {
            const room = await InterviewRoom.findOne({ roomId })
            if (!room) {
                socket.emit('error', { message: 'Room not found' })
                return
            }

            socket.join(roomId)
            if (!rooms.has(roomId)) rooms.set(roomId, new Set())
            rooms.get(roomId)!.add(socket.id)

            socket.to(roomId).emit('user-joined', { userId, userName, socketId: socket.id })
            socket.emit('room-info', {
                participants: rooms.get(roomId)!.size,
                status: room.status,
                problem: room.problem
            })
        } catch (e) {
            console.error('[Socket/Room]', e)
        }
    })

    socket.on('typing', ({ roomId }: { roomId: string }) => {
        socket.to(roomId).emit('user-typing', { userName })
    })

    socket.on('stop-typing', ({ roomId }: { roomId: string }) => {
        socket.to(roomId).emit('user-stop-typing', { userName })
    })

    socket.on('disconnecting', () => {
        socket.rooms.forEach(roomId => {
            const members = rooms.get(roomId)
            if (members) {
                members.delete(socket.id)
                socket.to(roomId).emit('user-left', { userId, userName, socketId: socket.id })
                if (members.size === 0) rooms.delete(roomId)
            }
        })
    })
}
