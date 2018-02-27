import {Request, Response} from 'express'
import * as matchController from './matches'

export function postPrediction(request: Request, response: Response): void {
	//validateUser()
	
	const match = matchController.findMatch(request.body.matchId)

	if (!match) {
		response.sendStatus(404)
		return
	}

	//validateBody()
	//save()
	
	response.send({match})
}
