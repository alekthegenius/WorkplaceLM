from flask import Flask, render_template, request, redirect, url_for
import datetime
import pandas as pd


app = Flask(__name__)

workspaces = pd.DataFrame(columns=['name', 'description', 'date', 'sources', 'id', 'icon', 'ai_description'])

demo_workspace = pd.DataFrame(data={'name': 'Workspace Name', 'description': 'Workspace Description', 'date': 'Dec 16, 2024', 'sources': 14, 'id': -1, 'icon': '&#128373;', 'ai_description': "The provided texts offer a multifaceted view of Cold War intelligence. One memoir recounts a CIA officer's experiences in Vietnam, the Philippines, Cambodia, and Iran, detailing his operational work and reflections on US foreign policy. Other documents are declassified CIA records, including analyses of the Soviet Union, the Korean War, and the Cuban Missile Crisis, revealing internal debates, assessments of Soviet military capabilities, and the crucial role of satellite imagery. Finally, a monograph explores the counterintelligence literature of the period, examining controversies surrounding Soviet penetration and the impact of key defectors' testimonies."}, index=[0])

workspaces = pd.concat([demo_workspace, workspaces], ignore_index=True)


id_number = 0

@app.route('/')
def main():

	return render_template("main.html", workspaces=workspaces.iterrows())

@app.route('/createWorkspace', methods=['POST'])
def createWorkspace():
	global workspaces
	global id_number
	
	name = request.form['name']
	description = request.form['description']

	current_date = datetime.datetime.now()
	date = f"{current_date.strftime("%b")} {current_date.day}, {current_date.year}"
	
	sources = request.form['sources']

	id_number += 1

	new_workspace = pd.DataFrame({'name': name, 'description': description, 'date': date, 'sources': sources, 'id': int(float(id_number)), 'icon': '', 'ai_description': ''}, index=[0])
	workspaces = pd.concat([new_workspace, workspaces], ignore_index=True)
	return redirect(url_for('main'))

@app.route('/deleteAllWorkspaces', methods=['POST'])
def deleteAllWorkspaces():
	global workspaces
	workspaces = pd.DataFrame(columns=['name', 'description', 'date', 'sources', 'id', 'icon', 'ai_description'])
	
	workspaces = pd.concat([demo_workspace, workspaces], ignore_index=True)

	
	
	return redirect(url_for('main'))


@app.route('/deleteWorkspace', methods=['POST'])
def deleteWorkspace():
	global workspaces
	id = int(float(request.form['workspace_id']))
	print(id)
	

	if id == -1:
		print("Deleting Demo Card")

		index = 0
		workspaces = workspaces.drop(index)
		
		return redirect(url_for('main'))
	
	elif workspaces.index[workspaces['id'] == id].tolist()[0] > 1:
		print("Error Multiple Workspaces with same ID")

		return redirect(url_for('main'))
	else:

		
		index = workspaces.index[workspaces['id'] == int(id)].tolist()[0]
		workspaces = workspaces.drop(index)
		return redirect(url_for('main'))
	

@app.route('/workspace/<workspace_id>', methods=['GET'])
def workspace(workspace_id):
	global workspaces

	print("Workspace ID: ")

	print("Workspaces: ")
	print(workspaces)

	workspace = workspaces[workspaces["id"] == int(float(workspace_id))]

	print("Workspace: ")
	print(workspace)
	return render_template("workspace_editor.html", workspace=workspace)

if __name__ == "__main__":
	workspaces = demo_workspace(workspaces)
	app.run(host="0.0.0.0", port=8080, debug=True)
    