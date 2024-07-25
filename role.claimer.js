var roleclaimer = {  
    /** @param {Creep} creep **/  
    run: function(creep) {  
        // 定义一系列的房间和位置  
        const waypoints = [  
            { room: 'E55N17', x: undefined, y: undefined },  
            { room: 'E56N17', x: undefined, y: undefined },  
            { room: 'E56N16', x: 31, y: 35 },  
            { room: 'E57N16', x: 13, y: 46 },  
            { room: 'E57N15', x: 6, y: 47 },  
            { room: 'E57N14', x: 42, y: 47 },  
            { room: 'E57N13', x: 7, y: 28 }, 
        ];  
        // 当前的目标索引  
        let currentIndex = creep.memory.currentIndex || 0;  
        // 当前目标  
        const currentWaypoint = waypoints[currentIndex];  
        // 如果creep不在目标房间或目标坐标上，则移向该目标  
        if (creep.room.name !== currentWaypoint.room ||  
            (currentWaypoint.x !== undefined && currentWaypoint.y !== undefined &&  
            !creep.pos.isEqualTo(currentWaypoint.x, currentWaypoint.y))) {  
            if (currentWaypoint.x !== undefined && currentWaypoint.y !== undefined) {  
                creep.moveTo(new RoomPosition(currentWaypoint.x, currentWaypoint.y, currentWaypoint.room), {  
                    visualizePathStyle: { stroke: '#ffaa00' }  
                });  
            } else {  
                creep.moveTo(new RoomPosition(25, 25, currentWaypoint.room), {  
                    visualizePathStyle: { stroke: '#ffaa00' }  
                });  
            }  
            return; // 移动操作后退出函数  
        }  
        // 如果creep已经到达E57N13房间的(7, 28)坐标  
        if (creep.room.name === 'E57N13' && creep.pos.x === 7 && creep.pos.y === 28) {  
            creep.memory.role = 'repairer';  
        } 
        creep.memory.currentIndex = currentIndex + 1;  
    }  
};

module.exports = roleclaimer
