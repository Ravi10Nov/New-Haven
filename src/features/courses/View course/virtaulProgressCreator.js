


export const virtualProgressCreator = (courseDoc) => {
    const progress = { 'course': courseDoc[ '_id' ], 'name': courseDoc[ 'name' ], 'quiz': courseDoc[ 'quiz' ], 'available_sections': [ courseDoc.sections[ 0 ][ '_id' ] ], 'description': courseDoc[ 'description' ], 'pictures': courseDoc[ 'pictures' ], 'updatedAt': courseDoc[ 'updatedAt' ], 'is_eligible_for_quiz': true, 'is_eligible_for_certificate': true, 'createdAt': Date.now() };

    let contentProgressTrack = [];

    courseDoc.sections.forEach( ( section, index ) =>{

        let tempSectionObject = { 'section_id': section[ '_id' ], 'title': section[ 'title' ], 'isAvailable': index === 0, 'isCompleted': true, 'contents': [] };

        section.contents.forEach( content => {
            let tempContentObject = { 'content_id': content[ '_id' ], 'title': content[ 'title' ], 'isDone': true };

            tempSectionObject.contents.push( tempContentObject );
        }
        );
        contentProgressTrack.push( tempSectionObject );
    }
    );

    progress[ 'content_progress_track' ] = contentProgressTrack;
    return progress
}