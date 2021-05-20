import React from 'react';
import DefaultProfileImg from '../images/default-profile-image.jpg'

const UserAside = ({profileImageUrl, username}) =>(
	<aside className='col-sm-2'>
		<div className='panel panel-default'>
			<div className='panel-body'>
				<img 
					width='200'
					height='200'
					src={profileImageUrl || DefaultProfileImg}
					alt={username}
					className='img-thumbnail'
				/>	
			</div>
		</div>
	</aside>
)

export default UserAside;