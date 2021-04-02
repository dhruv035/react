
name="trial"
commit="abc"
registry="${DOCKER_REGISTRY:-$(whoami)}"

npm run build
docker build -t starter .
echo "Tagging $name:$commit"
docker tag "$name:latest" "$name:$commit"
echo "Tagging $registry/$name:$commit"
docker tag "$name:$commit" "$registry/$name:$commit"
echo "Pushing $registry/$name:$commit"
docker push "$registry/$name:$commit"
