FROM node:8.16

# Create vcap directory in root and create a hard link to /cert-test/ directory to the link
#RUN mkdir /home/vcap && ln -s  /cert-test/OIDC_CIO_TEST.cer /home/vcap/app && chown -R default:root /home/vcap
#RUN mkdir /home/vcap && ln -s  /cert-test/OIDC_CIO_TEST.cer /home/vcap/app && chown -R root /home/vcap
#RUN mkdir /home/vcap/app && ln -s  /cert-test/OIDC_CIO_TEST.cer /home/vcap/app && chown -R root /home/vcap

# Make a home directory in the root
#RUN mkdir /home/vcap
# Create a symbolic link between certificate and home directory
#RUN ln -s  /cert-test/OIDC_CIO_TEST.cer /home/vcap/app
# Change the ownership of directory to the root
#RUN chown -R root /home/vcap/app

# Create app directory
RUN mkdir -p /usr/src/phd-api-cloud-ponessa
WORKDIR /usr/src/phd-api-cloud-ponessa

# Install app dependencies
COPY package.json /usr/src/phd-api-cloud-ponessa
RUN npm install

# Bundle app source
COPY . /usr/src/phd-api-cloud-ponessa

EXPOSE 4000
CMD ["node","."]