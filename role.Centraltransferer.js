var roleCentraltransferer = {  
    /**  
     * @param {Creep} creep - The creep to run logic for.  
     */  
    run: function(creep) {  
        const sourceRoomName = creep.memory.sourceRoomName;  
        const targetRoomName = creep.memory.targetRoomName;  
        const roomMemory = Memory.rooms.E54N19;  
        // 目标位置  
        const targetPosition = new RoomPosition(5, 9, creep.room.name);  
        creep.memory.dontPullMe = true;  
        // 如果creep尚未到达目标位置（通过比较坐标和房间名）  
        if (creep.pos.x !== targetPosition.x || creep.pos.y !== targetPosition.y || creep.room.name !== targetPosition.roomName) {  
            // 移动到目标位置  
            creep.moveTo(targetPosition, { visualizePathStyle: { stroke: '#ffaa00', opacity: 0.5, lineStyle: 'dashed' } });  
        } else {  
            // 到达目标位置后执行能量管理任务  
            this.manageEnergy(creep, roomMemory);  
        }  
    },  

    /**  
     * 管理Terminal和Storage之间的能量平衡  
     * @param {Creep} creep  
     * @param {Object} roomMemory  房间内存对象，包含关于房间状态的信息    
     */  
    manageEnergy: function(creep, roomMemory) {  
        // 查找Terminal和Storage  
        const terminal = creep.room.terminal;
        const storage = creep.room.storage;
        
        // 按照预习安排好的任务进行操作
        const centerLink = Game.getObjectById(roomMemory.centerLinkId); 
        if(roomMemory.transferEnergyToStorage){ //如果中央link发布转移能量到storage当中，就将中央link的能量提取出来到storage当中
            if(centerLink){
                if (creep.store.energy === 0) {  
                    if(creep.withdraw(centerLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                        creep.moveTo(centerLink, {visualizePathStyle: {stroke: '#ffaa00'}});  
                    }
                }  else if (creep.store.energy > 0){
                    if(storage){
                        if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#00ffaa'}});  
                        }
                    }
                }
            }
        } else if(roomMemory.requestEnergyFromCenterLink){ 
            //如果upgradelink发布向中央link收集能量，检测中央link的能量是否超过799，如果超过则待机，如果没有就将storage的能量转移到中央link；
            if (centerLink && centerLink.structureType === STRUCTURE_LINK) {  
                // 检查central link的能量  
                if (centerLink.store.energy >= 800) {  
                //待机
                } else {  
                    if (storage) {   
                        if (creep.store.energy === 0) {  
                            if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } });  
                            }  
                        }  else if (creep.store.energy > 0) {  
                            if (creep.transfer(centerLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                                creep.moveTo(centerLink, { visualizePathStyle: { stroke: '#ffaa00' } });  
                            }  
                        }  
                    }  
                }  
            } 
        }
        
        // // 遍历终端中的所有资源类型  
        // for (let resourceType in terminal.store) {  
        //     // 检查creep是否在终端的范围内  
        //     if (creep.withdraw(terminal, resourceType) === ERR_NOT_IN_RANGE) {  
        //         creep.moveTo(terminal, { visualizePathStyle: { stroke: '#ff0000' } });  
        //     } else if (creep.store.getFreeCapacity(resourceType) === 0) {   
        //             if (storage && creep.transfer(storage, resourceType) === ERR_NOT_IN_RANGE) {  
        //                 creep.moveTo(storage, { visualizePathStyle: { stroke: '#ff0000' } });  
        //             }  
        //     }  
        // }
    }  
};  
module.exports = roleCentraltransferer;