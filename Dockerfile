# use python:3.9.6 from docker hub
FROM python:3.9.6

# set working directory in the container
WORKDIR /TripPlanner

# install dependencies
COPY ./requirements.txt /TripPlanner/
RUN pip3 install -r requirements.txt

# now copy the rest of the app
COPY ./ /TripPlanner/

# expose the ports needed
EXPOSE 8000

# run the server
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]